a, b = input().strip().split(' ')

def anagram(w1, w2):
    w1 = sorted(w1)
    w2 = sorted(w2)
    for i in range(len(w1)):
        if w1[i] != w2[i]:
            return "False"
    return "True"

print(anagram(a, b))