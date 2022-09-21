A = int(input("A:"))
B = int(input("B:"))
C = int(input("C:"))

if A > B and A > C:
    print(A)
    if B > C:
        print(B)
        print(C)
    else:
        print(C)
        print(B)
elif B > A and B > C:
    print(B)
    if A > C:
        print(A)
        print(C)
    else:
        print(C)
        print(A)
elif C > A and C > B:
    print(C)
    if A > B:
        print(A)
        print(B)
    else:
        print(B)
        print(A)