def solution(n, l, r):
    # 1 -> 11011 -> 11011 11011 00000 11011 11011 -> 이전비트 이전비트 0*5^(n-1) 이전비트 이전비트
    # X -> 3 -> 3 8 11~15 18 21
    # (l-r+1) - 0의 개수

    # 1 -> 4 -> 4 4 0 4 4 = 16
    # 5비트를 전부 가지면 1*4^n의 값을 계산 + 나머지 빈 부분 계산

    # 
    recursion(n-1, l, r)
    answer = 0
    return answer

"""
11011 받으면 5개로 쪼개고 남아있는 n만큼 자릿수*5^n 만큼 보고
경우에 따라 계산
1. 상관없는 비트 = 버리기
2. 일부만 겹치는 비트 = 재귀로 다시 계산 혹시 n이 0이라면 자릿수 계산하여 리턴
3. 전부 겹치는 비트 = 5^n을 리턴

문제는 재귀를 거친 함수가 l과 r을 구분하는가
재귀로 넘겨줄 떄 (자릿수)*5만큼 뺴준다 n이 0일 떄만 계산하니까 문제없음
"""
place_value = [0, 1, 3, 4]
place_value_rev = [4, 3, 1, 0]
print(place_value_rev)
def recursion(n, l, r):
    r = 0
    if n == 0: # 가장 깊은 비트의 나머지 구하기
        for i in place_value:
            if l <= i and r >= i:
                r += 1
    # 재귀로 넘길 부분이 어디인지 파악 (수정필요)
    for idx, val in enumerate(place_value_rev):
        if r < val*(5**n) and idx+1 < 4:
            print(place_value_rev[idx+1])
            break
    for i in [4, 3, 1, 0]:
        if l > i*(5**n) in enumerate(place_value):
            print(place_value[idx])
            break
result 
print(solution(2, 4, 17))