
name_len = int(input())
name_arr = []
for j in range(name_len):
    name_arr.append(input())
time_arr = []
for j in range(name_len):
    time_arr.append(int(input()))
question_len = int(input())
sum = 0
k = 0
for j in range(question_len):
    when = int(input())
    while sum < when:
        sum += time_arr[k]
        k += 1
        if k >= name_len:
            k = 0

    print(name_arr[k-1])
    