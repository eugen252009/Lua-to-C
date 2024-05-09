#include <errno.h>
#include <fcntl.h>
#include <stdio.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <unistd.h>

#define BUFSIZE 256

int main(int argc, char *argv[]) {
  int fd = 0;
  char buf[BUFSIZE];
  ssize_t size;
  int errsv = 0;
  if (argc >= 2) {
    fd = open(argv[1], O_RDONLY);
    if (fd == -1) {
      errsv = errno;
      printf("%s", "Error Occured while opening file");
      printf("open() failed with errno Code: %d\n", errsv);
      return 1;
    }
  }
  do {
    size = read(fd, buf, BUFSIZE);
    if (size == -1) {
      int errsv = errno;
      printf("%s", "Error Occure\n");
      printf("read() failed with errno Code: %d\n", errsv);
      return 1;
    }
    for (size_t i = 0; i < size; i++) {
      printf("%c", buf[i]);
    }
  } while (size > 0);

  return 0;
}
