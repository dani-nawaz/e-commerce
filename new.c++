#include <iostream>
using namespace std;

//  complex ik aisa number ha jo ik real number p or ik imaginery number p consist krta ha
// 124132463 i

// 1 + 4i
// 5 + 8i
// -------
// 6 + 12i
class Complex
{
 int a, b;
 friend Complex sumComplex(Complex o1, Complex o2);

public:
 void setNumber(int n1, int n2)
 {
  a = n1;
  b = n2;
 }

 // Below line means that non member - sumComplex funtion is allowed to do anything with my private parts (members)
 void printNumber()
 {
  cout << "Your number is " << a << " + " << b << "i" << endl;
 }
};

Complex sumComplex(Complex o1, Complex o2)
{
 Complex o3;
 o3.setNumber((o1.a + o2.a), (o1.b + o2.b));
 return o3;
}
// int sum(int a, int b)
// {
//  int c;
//  c = a + b;
//  return c;
// }
int main()
{
 Complex c1, c2, sum;
 c1.setNumber(1, 4);
 c1.printNumber();

 c2.setNumber(5, 8);
 c2.printNumber();
 // int add = sum(3, 5);
 // cout << add;
 sum = sumComplex(c1, c2);
 sum.printNumber();

 return 0;
}