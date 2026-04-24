#include <iostream>
#include <cstdlib>
#include <ctime>
void find_min_max(const int* arr, int size, int& min_val, int& max_val) {min_val = max_val = arr[0];
 for (int i = 1; i < size; i++) {
 if (arr[i] < min_val) min_val = arr[i];
 if (arr[i] > max_val) max_val = arr[i];
 }
}
int main() {
 std::srand(std::time(nullptr));
 int size;
 std::cout << "Array size: ";
 std::cin >> size;
 int* arr = new int[size];
 for (int i = 0; i < size; i++) {
 arr[i] = std::rand() % 100;
 std::cout << arr[i] << " ";
 }
 int min_val, max_val;
 find_min_max(arr, size, min_val, max_val);
 std::cout << "\nMin: " << min_val << ", Max: " << max_val <<
std::endl;
 delete[] arr;
 return 0;
}

