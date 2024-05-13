#include <stdio.h>
#include <unistd.h>
#define BUF_SIZE 2048

int main(int argc, char *argv[]) {
  size_t n = 0;
  char buf[BUF_SIZE];
  do {
    n = read(0, &buf, BUF_SIZE);
    printf("%s", buf);
  } while (n > 0);
  return 0;
}
