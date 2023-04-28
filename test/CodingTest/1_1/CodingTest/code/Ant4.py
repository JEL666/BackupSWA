"""
문제 설명
개미 탈출 4
문제
준식이는 길이가 N 인 1차원 세상의 어딘가에 위치해 있고, 1차원 세상의 어딘가에 위치한 탈출구로 이동하려고 한다. 준식이는 1차원 세상에서 현재 위치한 칸에서 왼쪽 칸이나 오른쪽 칸으로 움직일 수 있다. 준식이가 가는 길에 벽이 있을 수도 있다. 준식이는 화가 많이 났기 때문에 주먹으로 최대 M 개의 벽을 부수고 지나갈 수 있다.

그런데 어느 날, 1차원 세상에 몬스터가 한 마리 떨어졌다. 준식이가 몬스터가 있는 칸으로 이동하기 위해서는 그 칸에 있는 몬스터와 싸워서 이겨야 한다.

현재 준식이의 공격력을 ATK_J , 체력을 HP_J 라고 하고, 몬스터의 공격력을 ATK_M, 체력을 HP_M 라고 하자. 준식이가 몬스터가 있는 칸으로 이동하면 전투가 시작되고, 전투는 다음과 같이 진행된다.

준식이의 현재 공격력 ATK_J 만큼 몬스터의 현재 체력 HP_M 를 깎는다.
몬스터의 체력이 0 이하이면 몬스터는 사라지고 준식이가 전투에서 이기게 된다.
몬스터의 공격력 ATK_M 만큼 준식이의 현재 체력 HP_J 를 깎는다.
준식이의 체력이 0 이하이면 준식이는 사라지고 몬스터가 전투에서 이기게 된다.
다시 1부터 진행한다.
준식이가 위치한 1차원 세상을 표현한 지도가 주어질 때 준식이는 1차원 세상을 탈출할 수 있을지 구해보자.

입력
첫째 줄에 테스트 케이스의 개수 T가 주어진다.

각 테스트 케이스의 첫째 줄에 1차원 세상의 길이 N (3 ≤ N ≤ 8) 와 준식이가 벽을 부술 수 있는 최대 횟수 M (0 ≤ M ≤ N) 가 주어진다.

둘째 줄에 1차원 세상을 표현한 길이 N 짜리 문자열 S 가 주어진다.

문자열에서 @ 는 단 한 번 등장하며, 준식이를 의미한다.

문자열에서 알파벳 대문자 O 는 한 번 이상 등장하며, 준식이가 이동하려는 탈출구를 의미한다.

문자열에서 & 는 단 한 번 등장하며, 몬스터를 의미한다.

나머지 위치의 문자는 . 이거나 # 이다. . 은 빈 칸을 의미한다. 준식이는 빈 칸으로 자유롭게 이동할 수 있다. # 은 벽을 의미한다. 준식이는 벽이 있는 칸으로 이동할 수 없지만, 최대 M 개의 벽은 부술 수 있다.

셋째 줄에 초기 준식이의 공격력 ATK_J (1 ≤ ATK_J ≤ 100) 와 체력 HP_J (1 ≤ HP_J ≤ 100) 가 주어진다.

넷째 줄에 초기 몬스터의 공격력 ATK_M (1 ≤ ATK_M ≤ 100) 와 체력 HP_M (1 ≤ HP_M ≤ 100) 이 주어진다.

출력
각 테스트 케이스마다 준식이가 1차원 세상을 탈출할 수 있다면 HAHA! 를 출력한다. 그렇지 못하다면 HELP! 를 출력한다. 모두 대문자로 출력해야 하는 것에 유의한다.

예제 입력 1
4
8 1
O&#@##.O
10 10
100 11
3 0
@&O
1 1
1 1
5 0
O#@&O
2 49
1 100
8 3
O#@###&O
1 1
100 100
예제 출력 1
HELP!
HAHA!
HELP!
HAHA!

"""
import math

testcase_size = int(input())

for i in range(testcase_size):
    possible = 0
    n, m = map(int, input().strip().split(' '))
    world = list(input().strip().replace('.', ''))
    atk_j, hp_j = map(int, input().strip().split(' '))
    atk_m, hp_m = map(int, input().strip().split(' '))

    pos_ze = []
    pos_at = world.index('@')
    pos_mo = world.index('&')
    dst_mo = pos_at - pos_mo
    for idx, val in enumerate(world):
        if val == 'O':
            pos_ze.append(idx)
    
    
    for pos_es in pos_ze:
        dst_es = pos_at - pos_es
        dst_es_abs = abs(dst_es)
        encounter_mon = False
        
        if abs(dst_es) > abs(dst_mo) and dst_es*dst_mo > 0:
            encounter_mon = True
            dst_es_abs -= 1
        
        if dst_es_abs-1 <= m:
            if encounter_mon:
                if math.ceil(hp_m / atk_j) <= math.ceil(hp_j / atk_m):
                    possible = 1
                    break

            else:
                possible = 1
                break
    
    print("HAHA!") if possible else print("HELP!")