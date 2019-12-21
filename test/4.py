import unittest
import sys

sys.path.insert(1, '../4')

from solver import check_criteria


class SolverTest(unittest.TestCase):
    def test(self):
        self.assertTrue(check_criteria(False)(111111))
        self.assertFalse(check_criteria(False)(223450))
        self.assertFalse(check_criteria(False)(123789))
        self.assertTrue(check_criteria(True)(112233))
        self.assertFalse(check_criteria(True)(123444))
        self.assertTrue(check_criteria(True)(111122))
