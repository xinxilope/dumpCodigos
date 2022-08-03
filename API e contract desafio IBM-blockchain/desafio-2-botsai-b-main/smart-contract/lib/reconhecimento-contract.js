/* eslint-disable no-constant-condition */
/* eslint-disable eqeqeq */
/* eslint-disable quotes */
/* eslint-disable indent */
/*
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

const { Contract } = require("fabric-contract-api");
const Auxx = require("./Auxx");

let activeCycle = false;
let receivedPointsCycle = 0;
let txCycle = 0;
let txHistoryList = [];

class generalContract extends Contract {
    //custom
    async startCycle(ctx) {
        const identity = ctx.clientIdentity;
        const checkAttr = identity.assertAttributeValue("rh", "true");
        if (checkAttr) {
            if (activeCycle === false) {
                const startKey = "0";
                const endKey = "999";
                const iterator = await ctx.stub.getStateByRange(
                    startKey,
                    endKey
                );
                activeCycle = true;
                receivedPointsCycle = 0;

                txCycle = 0;
                txHistoryList = [];

                while (true) {
                    const res = await iterator.next();

                    if (res.value && res.value.value.toString()) {
                        const Key = res.value.key;

                        let user = await ctx.stub.getState(Key);
                        user = JSON.parse(user);
                        const asset = {
                            id: user.id,
                            pointsToRedeem: user.pointsToRedeem,
                            pointsToSend: 2000,
                        };
                        const buffer = Buffer.from(JSON.stringify(asset));
                        await ctx.stub.putState(Key, buffer);
                    }
                    if (res.done) {
                        await iterator.close();
                        return JSON.stringify("new cycle started!");
                    }
                }
            } else {
                throw new Error("cycle must be disabled!");
            }
        } else {
            throw new Error("You must be a RH to carry out this transaction!");
        }
    }

    async sendPoints(ctx, userID1, userID2, value) {
        if (activeCycle === true) {
            const valueIsMultiple = value % 100;
            const exists1 = await this.userExists(ctx, userID1);
            const exists2 = await this.userExists(ctx, userID2);
            if (!exists1 && !exists2) {
                throw new Error("One of the users dont exist");
            } else if (valueIsMultiple !== 0) {
                throw new Error("The value must be multiple of 100");
            } else if (value <= 0) {
                throw new Error("The value must be a positive number");
            } else if (userID1 == userID2) {
                throw new Error("You cannot send points to yourself!");
            }
            txHistoryList = [];
            const history = await ctx.stub.getHistoryForKey("TxHistory");
            const TxHistory =
                history !== undefined
                    ? await Auxx.iteratorForJSON(history, true)
                    : [];
            for (let i = 0; i < txCycle; i++) {
                txHistoryList.push(TxHistory[i].transaction);
            }
            for (let j = 0; j < txHistoryList.length; j++) {
                if (
                    userID2 == txHistoryList[j].whoSends &&
                    txHistoryList[j].whoReceives == userID1
                ) {
                    throw new Error(
                        "You cannot send points back to someone that already sent you points this cycle!"
                    );
                }
            }
            receivedPointsCycle = 0;
            const history2 = await ctx.stub.getHistoryForKey("TxHistory");
            const TxHistory2 =
                history2 !== undefined
                    ? await Auxx.iteratorForJSON(history2, true)
                    : [];
            for (let i = 0; i < txCycle; i++) {
                if (TxHistory2[i].transaction.whoReceives == userID2) {
                    receivedPointsCycle = receivedPointsCycle + TxHistory2[i].transaction.value
                }
            } if (receivedPointsCycle >= 2000) {
                throw new Error("User has already received maximum points in this cycle (2000)!");
            }

            let user1 = await ctx.stub.getState(userID1);
            user1 = JSON.parse(user1);
            if (user1.pointsToSend - Number(value) < 0) {
                throw new Error("Insufiscient funds");
            }

            const asset1 = {
                id: user1.userID,
                pointsToRedeem: user1.pointsToRedeem,
                pointsToSend: user1.pointsToSend - Number(value),
            };
            const buffer1 = Buffer.from(JSON.stringify(asset1));
            await ctx.stub.putState(userID1, buffer1);

            let user2 = await ctx.stub.getState(userID2);
            user2 = JSON.parse(user2);
            const asset2 = {
                id: user2.userID,
                pointsToRedeem: user2.pointsToRedeem + Number(value),
                pointsToSend: user2.pointsToSend,
            };
            const buffer2 = Buffer.from(JSON.stringify(asset2));
            await ctx.stub.putState(userID2, buffer2);

            const asset3 = {
                whoSends: userID1,
                whoReceives: userID2,
                value: value,
            };
            const buffer3 = Buffer.from(JSON.stringify(asset3));
            await ctx.stub.putState("TxHistory", buffer3);
            txCycle = txCycle + 1;
            return JSON.stringify("Successful transaction!");
        } else {
            throw new Error("Cycle must be active in order to proceed with the transaction!");
        }
    }

    async redeemPoints(ctx, userID1, value) {
        if (activeCycle === true) {
            const valueIsMultiple = value % 100;
            const exists1 = await this.userExists(ctx, userID1);
            const exists2 = await this.userExists(
                ctx,
                "retiradas@compass.uol"
            );
            if (!exists1 && !exists2) {
                throw new Error("One of the users dont exist");
            } else if (valueIsMultiple !== 0) {
                throw new Error("The value must be multiple of 100");
            }

            let user1 = await ctx.stub.getState(userID1);
            user1 = JSON.parse(user1);
            if (user1.pointsToRedeem - Number(value) < 0) {
                throw new Error("Insufiscient funds");
            } else if (user1.pointsToRedeem < 1000) {
                throw new Error(
                    "You need to have at least 1000 points to redeem"
                );
            }

            const asset1 = {
                id: user1.userID,
                pointsToRedeem: user1.pointsToRedeem - Number(value),
                pointsToSend: user1.pointsToSend,
            };
            const buffer1 = Buffer.from(JSON.stringify(asset1));
            await ctx.stub.putState(userID1, buffer1);

            let user2 = await ctx.stub.getState("retiradas@compass.uol");
            user2 = JSON.parse(user2);
            const asset2 = {
                id: user2.userID,
                pointsToRedeem: user2.pointsToRedeem + Number(value),
                pointsToSend: user2.pointsToSend,
            };
            const buffer2 = Buffer.from(JSON.stringify(asset2));
            await ctx.stub.putState("retiradas@compass.uol", buffer2);
            return JSON.stringify("Redeemed successful!");
        } else {
            throw new Error("Cycle must be active in order to proceed with the transaction!");
        }
    }

    async endCycle(ctx) {
        const identity = ctx.clientIdentity;
        const checkAttr = identity.assertAttributeValue("rh", "true");
        if (checkAttr) {
            if (activeCycle === true) {
                activeCycle = false;
                return JSON.stringify("Finished cycle!");
            } else {
                throw new Error("Cycle must be active!");
            }
        } else {
            throw new Error("You must be a RH to carry out this transaction!");
        }
    }

    async TxHistory(ctx) {
        if (txCycle < 1) {
            throw new Error(
                "There were no transactions in this cycle until now!"
            );
        }
        txHistoryList = [];
        const history = await ctx.stub.getHistoryForKey("TxHistory");
        const TxHistory =
            history !== undefined
                ? await Auxx.iteratorForJSON(history, true)
                : [];
        for (let i = 0; i < txCycle; i++) {
            txHistoryList.push(TxHistory[i].transaction);
        }
        return txHistoryList;
    }

    //default methods
    async userExists(ctx, userID) {
        const buffer = await ctx.stub.getState(userID);
        return !!buffer && buffer.length > 0;
    }

    async createUser(ctx, userID) {
        const exists = await this.userExists(ctx, userID);
        if (exists) {
            throw new Error(`The user ${userID} already exists`);
        }
        const asset = {
            id: userID,
            pointsToRedeem: 0,
            pointsToSend: 0,
        };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(userID, buffer);
    }

    async readUser(ctx, userID) {
        const exists = await this.userExists(ctx, userID);
        if (!exists) {
            throw new Error(`The user ${userID} does not exist`);
        }
        const buffer = await ctx.stub.getState(userID);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async deleteUser(ctx, userID) {
        const exists = await this.userExists(ctx, userID);
        if (!exists) {
            throw new Error(`The user ${userID} does not exist`);
        }
        await ctx.stub.deleteState(userID);
    }
}

module.exports = generalContract;
