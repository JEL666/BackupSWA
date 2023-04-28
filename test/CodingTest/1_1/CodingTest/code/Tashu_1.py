testcase_len = int(input())
rental_office = 0
for i in range(testcase_len):
    rental_office_len = int(input())
    rental_office = list(map(int, input().split(" ")))
    record = int(input())
    for j in range(record):
        r = list(map(int, input().split(" ")))
        rental_office[r[0]-1] -= 1
        rental_office[r[1]-1] += 1
    print(*rental_office)
