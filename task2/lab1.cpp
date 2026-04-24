#include <iostream>
int main() {
 double temp;
 char unit;
 std::cout << "Enter temperature: ";
 std::cin >> temp;
 std::cout << "Unit (C/F): ";
 std::cin >> unit;
 if (unit == 'C' || unit == 'c') {
 double f = (9.0 / 5.0) * temp + 32.0;
 std::cout << temp << " C = " << f << " F" << std::endl;
 } else if (unit == 'F' || unit == 'f') {
 double c = (5.0 / 9.0) * (temp - 32.0);
 std::cout << temp << " F = " << c << " C" << std::endl;
 } else {
 std::cout << "Invalid unit!" << std::endl;
 return 1;
 }
 return 0;
}
