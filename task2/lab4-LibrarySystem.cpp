// ===============================
// Library Management System (C++)
// Features:
// - unique_ptr + abstract base (Shape hierarchy)
// - template Stack<T>
// - std::map<int, shared_ptr<Book>>
// - STL algorithms (sort, find_if, transform-like usage)
// - operator overloading
// - exception handling
// - header/source style separation (simulated in one file)
// ===============================

#include <iostream>
#include <memory>
#include <map>
#include <vector>
#include <algorithm>
#include <stdexcept>
#include <string>

using namespace std;

// ===============================
// Exceptions
// ===============================
class InvalidInputException : public exception {
public:
    const char* what() const noexcept override {
        return "Invalid input provided!";
    }
};

class BookNotFoundException : public exception {
public:
    const char* what() const noexcept override {
        return "Book not found in library!";
    }
};

// ===============================
// Shape hierarchy (unique_ptr demo)
// ===============================
class Shape {
public:
    virtual double area() const = 0;
    virtual string name() const = 0;
    virtual ~Shape() = default;
};

class Rectangle : public Shape {
    double w, h;
public:
    Rectangle(double w, double h) : w(w), h(h) {}
    double area() const override { return w * h; }
    string name() const override { return "Rectangle"; }
};

class Circle : public Shape {
    double r;
public:
    Circle(double r) : r(r) {}
    double area() const override { return 3.14159 * r * r; }
    string name() const override { return "Circle"; }
};

// ===============================
// Book class (operator overloading)
// ===============================
class Book {
    int id;
    string title;
    string author;
    int pages;
public:
    Book(int id, string t, string a, int p)
        : id(id), title(t), author(a), pages(p) {}

    int getId() const { return id; }
    string getTitle() const { return title; }
    string getAuthor() const { return author; }
    int getPages() const { return pages; }

    // operator overloading ==
    bool operator==(const Book& other) const {
        return id == other.id;
    }

    // operator overloading <<
    friend ostream& operator<<(ostream& os, const Book& b) {
        os << "[ID: " << b.id << "] " << b.title
           << " by " << b.author << " (" << b.pages << " pages)";
        return os;
    }
};

// ===============================
// Template Stack<T>
// ===============================

template<typename T>
class Stack {
    vector<T> data;
public:
    void push(T val) {
        data.push_back(val);
    }

    void pop() {
        if (data.empty()) throw InvalidInputException();
        data.pop_back();
    }

    T top() const {
        if (data.empty()) throw InvalidInputException();
        return data.back();
    }

    bool empty() const {
        return data.empty();
    }
};

// ===============================
// Library System
// ===============================
class Library {
    map<int, shared_ptr<Book>> books;

public:
    void addBook(shared_ptr<Book> book) {
        books[book->getId()] = book;
    }

    shared_ptr<Book> getBook(int id) {
        if (books.find(id) == books.end())
            throw BookNotFoundException();
        return books[id];
    }

    void removeBook(int id) {
        if (books.erase(id) == 0)
            throw BookNotFoundException();
    }

    void displayAll() const {
        for (const auto& [id, book] : books) {
            cout << *book << endl;
        }
    }

    vector<shared_ptr<Book>> searchByAuthor(const string& author) {
        vector<shared_ptr<Book>> result;

        for (const auto& [id, book] : books) {
            if (book->getAuthor() == author)
                result.push_back(book);
        }

        return result;
    }

    void sortByPages() {
        vector<shared_ptr<Book>> temp;

        for (auto& [id, book] : books)
            temp.push_back(book);

        sort(temp.begin(), temp.end(),
            [](const shared_ptr<Book>& a, const shared_ptr<Book>& b) {
                return a->getPages() < b->getPages();
            });

        cout << "\nSorted by pages:\n";
        for (auto& b : temp)
            cout << *b << endl;
    }
};

// ===============================
// main
// ===============================
int main() {
    try {
        Library lib;

        lib.addBook(make_shared<Book>(1, "C++ Basics", "Ali", 300));
        lib.addBook(make_shared<Book>(2, "Data Structures", "Sara", 450));
        lib.addBook(make_shared<Book>(3, "Algorithms", "Ali", 500));

        cout << "All books:\n";
        lib.displayAll();

        cout << "\nSearch by author (Ali):\n";
        auto result = lib.searchByAuthor("Ali");
        for (auto& b : result)
            cout << *b << endl;

        lib.sortByPages();

        // Stack demo
        Stack<int> st;
        st.push(10);
        st.push(20);
        cout << "\nStack top: " << st.top() << endl;
        st.pop();

        // Shape demo (unique_ptr)
        unique_ptr<Shape> s1 = make_unique<Rectangle>(5, 10);
        unique_ptr<Shape> s2 = make_unique<Circle>(7);

        cout << "\nShape: " << s1->name() << " Area: " << s1->area() << endl;
        cout << "Shape: " << s2->name() << " Area: " << s2->area() << endl;

        // Exception demo
        // lib.getBook(999);

    } catch (const exception& e) {
        cout << "Error: " << e.what() << endl;
    }

    return 0;
}

// ===============================
// Suggested file separation:
// Book.h / Book.cpp
// Library.h / Library.cpp
// Shape.h / Shape.cpp
// Stack.h
// Exceptions.h
// main.cpp
// ===============================
