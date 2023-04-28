"""준식이의 모엄 2
문제
준식이의 모엄 은 준식이가 2차원 N × M 격자 세상에서 떠나는 모험을 주제로 한 게임이다. 당신은 이 게임의 개발자가 되었다.

준식이는 2차원 N × M 격자 세상의 어딘가에 위치해 있다. 플레이어는 L , R , U , D 입력을 통해 준식이를 왼쪽, 오른쪽, 위, 아래 칸으로 이동시킬 수 있다. 하지만 만약 이동하려는 칸이 격자 바깥이거나, 벽인 경우 준식이는 플레이어의 입력을 무시하고 제자리에서 이동하지 않는다.

게임을 좀 더 흥미진진하게 만들기 위해서 격자 세상에 가시 함정(^)이 추가되었다. 준식이는 가시 함정이 위치한 칸으로 이동할 수 있지만 함정을 밟아서 데미지를 1만큼 입게 된다. 함정은 밟더라도 사라지지 않는다. 만약 함정 위에서 입력받은 방향으로 움직일 수 없어 제자리에 멈추는 경우, 해당 함정을 또 밟게 되고 데미지를 1만큼 또 입게 된다.

예를 들어 다음과 같은 격자 세상에서 플레이어가 RDUUR 을 입력했을 때 게임이 어떻게 진행되는지 보자.
7.png
위 그림에서 준식이는 1, 3, 4번째에 가시를 밟게 되고, 총 3의 데미지를 입게 된다.

2차원 N × M 격자 세상과 플레이어의 입력이 주어질 때, 플레이어의 모든 입력이 끝난 후의 준식이의 위치는 어디일까? 또, 가시 함정을 밟아서 입은 데미지는 얼마일까?

이 문제에서 준식이의 체력은 무한하기 때문에 아무리 데미지를 입어도 쓰러지지 않고 꿋꿋이 이동한다.

입력
첫째 줄에 테스트 케이스의 개수 T가 주어진다.

각 테스트 케이스의 첫째 줄에 2차원 격자 세상의 크기 N, M (1 ≤ N, M ≤ 8) 이 주어진다. N 은 격자의 세로 길이이고, M 은 가로 길이이다.

둘째 줄부터 N 개의 줄에 2차원 N × M 격자 세상 S 가 주어진다.

S 에서 @ 는 단 한 번 등장하며, 준식이를 의미한다.

S 에서 ^ 는 여러 번 등장할 수 있으며, 가시 함정을 의미한다.

나머지 위치의 문자는 . 이거나 # 이다. . 은 빈 칸을 의미한다. 준식이는 빈 칸으로 자유롭게 이동할 수 있다. # 은 벽을 의미한다. 준식이는 벽이 있는 칸으로 이동할 수 없다.

셋째 줄에 플레이어의 입력의 길이 K (1 ≤ K ≤ 100) 이 주어진다.

넷째 줄에 플레이어의 입력 T 가 주어진다. T 는 길이가 K 인 문자열이며 L , R , U , D 만으로 구성되어 있다. 플레이어의 입력은 입력된 순서대로 주어지며, 준식이를 격자 바깥이나 벽으로 이동하게 하는 입력이 있을 수 있다.

출력
각 테스트 케이스마다 플레이어의 모든 입력이 끝난 후의 준식이의 위치를 의미하는 두 정수 R, C (1 ≤ R, C ≤ 8) 를 출력한다. R 은 격자에서 행 번호를 의미하고 C 는 열 번호를 의미한다. 또한 준식이가 가시 함정을 밟아서 입은 데미지를 출력한다.

예제 입력 1
6
5 5
@...^
####.
^...^
.####
^...^
16
RRRRDDLLLLDDRRRR
3 4
#.##
#^@^
#.^.
4
LLUU
3 8
.......@
###^^###
........
10
LDDLLDLLDR
3 4
.##.
#@^#
.##
8
LRLRLRUD
4 5
@#^#.
.#^#.
.###.
....^
10
URRDDLDRRR
4 4
####
#@^#
#^^#
####
9
RDLURRDLU
예제 출력 1
5 5 5
1 2 2
3 5 3
2 3 5
4 4 0
2 2 7"""
def adventure(world1, h, w, command1):
    damaged = 0
    junsik_h = -1;
    junsik_w = -1;
    for i in range(h):
        for j in range(w):
            if world1[i][j] == '@':
                junsik_h = i
                junsik_w = j
    for idx, val in enumerate(command1):
        j_h = junsik_h
        j_w = junsik_w
        if val == 'R':
            j_w += 1
        elif val == 'L':
            j_w -= 1
        elif val == 'U':
            j_h -= 1
        elif val == 'D':
            j_h += 1
        else:
            print("err")
        if j_h < 0 or j_h > h-1 or j_w < 0 or j_w > w-1:
            #print("continued", h, w, j_h, j_w)
            continue
        elif world1[j_h][j_w] != '#':
            junsik_h = j_h
            junsik_w = j_w
        if world1[junsik_h][junsik_w] == '^':
            damaged += 1
        #print(val, junsik_h, junsik_w)
    answer.append([junsik_h+1, junsik_w+1, damaged])

testcase = int(input().strip())
height = 0
width = 0
answer = []
for _ in range(testcase):
    height, width = (map(int, input().strip().split(' ')))
    world = []
    for _ in range(height):
        world.append(input().strip())
    command_size = int(input())
    command = input()

    adventure(world, height, width, command)

for idx in range(len(answer)):
    print(answer[idx][0], answer[idx][1], answer[idx][2])