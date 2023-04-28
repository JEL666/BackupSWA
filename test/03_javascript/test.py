def adventure(world1, h, w, command1):
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
        #print(val, junsik_h, junsik_w)
    answer.append([junsik_h+1, junsik_w+1])

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
    print(answer[idx][0], answer[idx][1])