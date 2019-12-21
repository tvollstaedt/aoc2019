import functools
import sys


def get_digit_num_from_layer(layer, digit_to_find):
    return functools.reduce(lambda a, c: a + c.count(str(digit_to_find)), layer, 0)


def get_layer_with_lowest_digit_count(image, width, height, digit_to_find):
    lowest_count = sys.maxsize
    lowest_count_layer = None
    layers = [image[i:i + width] for i in range(0, len(image), width)]
    for layer in [layers[j:j + height] for j in range(0, len(layers), height)]:
        zerocount = get_digit_num_from_layer(layer, digit_to_find)
        if zerocount < lowest_count:
            lowest_count = zerocount
            lowest_count_layer = layer

    return lowest_count_layer


def main():
    f = open('input', 'r')
    image = f.read()
    layer_with_lowest_digit_count = get_layer_with_lowest_digit_count(image, 25, 6, 0)
    result = get_digit_num_from_layer(layer_with_lowest_digit_count, 1) * get_digit_num_from_layer(
        layer_with_lowest_digit_count, 2)

    # Part 1
    print("Part 1:", result)


if __name__ == "__main__":
    main()
