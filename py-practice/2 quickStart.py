# 2.1 print
print('hello world')
print("%s is count %d" % ('python', 2))
# 还可以重定向输出到文件

# 2.2 input
num = input('input a number: ')
print('the number your input is %s' % (num))

# 2.3 注释

# 2.4 操作符
# 算术运算 + - * / // % **
# 比较运算 < <= > >= == !=
# 逻辑操作符  and or not

# 2.5 变量和赋值
counter = 0

# 2.6 数字
# 类型 int long bool float complex

# 2.7 子字符串
pystr = "python"
print(pystr[2:4])

# 2.8 列表和元祖
aList = [1, 2, 3, 4]
aTuple = (1, 'a', True)

# 2.9 字典
aDict = {'name': 'kk', 'value': '1'}
print(aDict.keys())

# 2.10 代码块及缩进

# 2.11 判断语句
x = 1
if x < 0:
    print('negtive')
elif x < 10:
    print('small')
else:
    print('big than ten')

# 2.12 while循环
counter = 0
while counter < 3:
    print('loop %d', (counter))
    counter += 1

# 2.13 for 和 range
for item in [1, 2, 3]:
    print(item, '----')
for rItem in range(2, 5):
    print('range:', rItem)

# 2.14 列表解析
squared = [x ** 2 for x in range(3)]
print('2.14 :', squared)

sqdEvents = [x ** 2 for x in range(8) if not x % 2]
print('2.14: ', sqdEvents)

# 2.15 文件  - test.txt
# fileName = input('input file name:')
# fobj = open(fileName, 'r')
# for line in fobj:
#     print('line:', line)
# fobj.close()

# 2.16异常
try:
    fileName = input('input file name:')
    fobj = open(fileName, 'r')
    for line in fobj:
        print('line:', line)
    fobj.close()
    # raise error
except IOError as err:
    print('file open error', err)


# 2.17 函数
def add(a, b=2):
    return a+b


print(add(2))
print(add(1, 1))

# 类


class Parent():
    def __init__(self) -> None:
        print('parent init')


class Foo(Parent):
    def __init__(self) -> None:
        super().__init__()
        print('foo instance')


f = Foo()


# 2.19 模块

# import sys 需要在文件开头
# py 文件就是导出的模块


# 2.20 其他实用函数
obj = [1, 23, 4]
print(dir(obj))  # 显示对象属性
print(len(obj))  # 对象长度
print(type(obj))  # 对象类型
