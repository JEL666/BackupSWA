input_ = input().split(" ")
a = input_[0]
b = int(input_[1])
#adbdccba
#abbaeghjkjhgfghbvc
# 왼쪽과 오른쪽 끝을 비교해가며 읽는데 n만큼 무시하고 지나갔으면 실패 n보다 적게 무시했는데 지나가지 못하면 성공
def palindrome(str1, n1):
    if len(str1) == 1 or len(str1) <= n1:
        return True

    i = 0
    rem_i_len = 0
    rem_j_len = 0
    stacked_len = 0
    prev_j = len(str1)
    for k in range(len(str1)):
        i = k
        rem_i_len = 0
        while i < len(str1) and rem_i_len <= n1:
            j = prev_j-1
            stacked_len = 0
            while j > i and rem_i_len+rem_j_len+stacked_len <= n1:
                print(str1[i], str1[j], rem_i_len, rem_j_len, stacked_len)
                if str1[i] == str1[j]:
                    stacked_len += rem_j_len
                    prev_j = j
                    break
                j -= 1
                rem_j_len += 1
            if j == i or rem_i_len+rem_j_len+stacked_len > n1:      #조건
                print(str1[i], str1[j])
                rem_i_len += 1
            i += 1
        if rem_i_len + stacked_len <= n1:
            return True
    return False

print(palindrome(a, b))