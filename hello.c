#include <stdio.h>

int main() {
    int n;

    printf("Enter a positive integer: ");
    scanf("%d", &n);

    int i = 1;

    printf("The multiplication table for %d is:\n", n);

    while (i++ <= 10) {
        printf("%d * %d = %d\n", n, i, n * i);
    }
    

    return 0;
}
#include <stdio.h>

int main() {
    int n, factorial = 1;

    printf("Enter a positive integer: ");
    scanf("%d", &n);

    int i = 1;

    do {
        factorial *= i;
        i++;
    } while (i <= n);

    printf("Factorial of %d = %d\n", n, factorial);

    return 0;
}