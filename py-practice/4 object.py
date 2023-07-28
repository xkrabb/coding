#!/usr/bin/env python3

from tool import p

# 4.2 标准对象
# 整型，布尔型，长整型，浮点型，复数型， 字符串，列表，元组，字典

# 4.3 其他内建
p(type(43))
a = None
p(type(a))
if (() or {} or []):
    p('exit true')
else:
    p('empty')

# 4.4 内部类型
# py 源码片段 - compile()得到代码对象 - exec/eval() 执行代码对象
# 切片对象 [startIdx, endIdx, step]
list = [1, 2, 3, 4, 5, 6, 7, 8]
p(list[0:-1:3])
# range对象
li = range(1, 8, 2)
for num in li:
    print(num)


# 4.5 操作符
# 比较 > < == !=
# 身份比较 is 是否指向同一个对象
p(2 is 2)
foo = 2.0
foo2 = 1.0+1.1
p('is ', int(foo) is not int(foo2))
# 布尔 or not and
