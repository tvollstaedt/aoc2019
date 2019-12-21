import re


def check_criteria(strict=False):
    def pass_filter(password):
        password = str(password)
        valid = False

        for index in range(len(password) - 1):
            # Check if digits are increasing (Rule #4)
            if int(password[index + 1]) < int(password[index]):
                return False

        if strict:
            # Part 2: Remove more than two consecutive adjacent integers
            password = re.sub(r'(\d)\1{2,}', '', password)

        for index in range(len(password) - 1):
            # Check if there are two same adjacent digits (Rule #3)
            if password[index] == password[index + 1]:
                valid = True

        return valid

    return pass_filter


def main():
    test_range = range(278384, 824795)

    # Part 1
    print("Part 1:", len(list(filter(check_criteria(False), test_range))))

    # Part 2
    print("Part 2:", len(list(filter(check_criteria(True), test_range))))


if __name__ == "__main__":
    main()
