#!/usr/bin/env python3

import cmath

num = int(input("输入数字"))

sqrtNum = cmath.sqrt(num)

print('{0}的平方根，实数{1:0.3f} 虚数{2:0.3f}j'.format(num, sqrtNum.real, sqrtNum.imag))
