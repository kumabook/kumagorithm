#ifndef KUMAGORITHM_VECTOR
#define KUMAGORITHM_VECTOR

#include <stdint.h>

typedef long elem;
typedef struct {
  elem   *array;
  int32_t size;
  int32_t capacity;
} vector;

extern vector *vector_construct(void);
extern void    vector_destruct(vector *vec);
extern int     vector_size(vector *vec);
extern bool    vector_is_empty(vector *vec);
extern void    vector_push(vector *vec, elem item);
extern elem    vector_pop(vector *vec);
extern elem    vector_peek(vector *vec);

#endif
