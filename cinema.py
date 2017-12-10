tmp = [25, 25, 25, 25, 25, 25, 25, 50, 50, 59, 100, 100, 100, 100]  # False
tmp2 = [25, 25, 25, 100]  # True
tmp3 = [25, 50, 25, 100]  # True
tmp4 = [25, 25, 25, 25, 25, 100, 100]  # False


def can_sell(buyers_list):
    cash25 = 0
    cash50 = 0

    def inner():
        nonlocal cash25
        nonlocal cash50
        for buyer in buyers_list:
            if buyer == 25:
                cash25 += 1
            elif buyer == 50:
                if cash25 > 0:
                    cash25 -= 1
                    cash50 += 1
                else:
                    return False
            elif buyer == 100:
                if cash50 > 0 and cash25 > 0:
                    cash50 -= 1
                    cash25 -= 1
                elif cash25 > 2:
                    cash25 -= 3
                else:
                    return False
        return True
    return inner()


print(can_sell(tmp))
print(can_sell(tmp2))
print(can_sell(tmp3))
print(can_sell(tmp4))
