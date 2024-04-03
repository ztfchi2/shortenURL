import random

encoding_lookup = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
		"q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F",
		"G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V",
		"W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "_",]


def generate_rand_ints(num):
    return random.sample(range(0, 63), num)

def encode_rand_ints(randInts):
    return ''.join([encoding_lookup[num] for num in randInts])

def generate_rand_token(num):
    rand_ints = generate_rand_ints(num)
    return encode_rand_ints(rand_ints)