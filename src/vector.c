#include <stdlib.h>
#include <stdio.h>
#include <stdbool.h>
#include <assert.h>

#include "vector.h"

vector *vector_construct()
{
  vector *self = (vector *) malloc(sizeof(vector));
  if (self == NULL) return NULL;

  self->array    = (elem*) malloc(sizeof(elem) * 2);
  self->size     = 0;
  self->capacity = 2;
  return self;
}

elem *vector_array(vector *self)
{
  return self->array;
}

int32_t vector_capacity(vector *self)
{
  return self->capacity;
}

void vector_destruct(vector *self)
{
  if (self->array != NULL) {
    free(self->array);
    self->array = NULL;
  }
}
int vector_size(vector *self)
{
  return self->size;
}
bool vector_is_empty(vector *self)
{
  return self->size == 0;
}

void vector_resize(vector *self, int32_t capacity) {
  assert(capacity >= self->size);
  self->capacity = capacity;
  elem *temp = (elem*) malloc(sizeof(elem) * capacity);
  for (int i = 0; i < self->size; i++) {
    temp[i] = self->array[i];
  }
  free(self->array);
  self->array = temp;
}

void vector_push(vector *self, elem item)
{
  uint32_t l = self->capacity;
  if (self->size == l) vector_resize(self, 2 * l);
  self->array[self->size++] = item;
}
elem vector_pop(vector *self)
{
  assert(!vector_is_empty(self));

  uint32_t l = self->capacity;
  elem v = self->array[self->size - 1];
  self->size--;
  if (self->size > 0 && self->size == l / 4) vector_resize(self, l / 2);
  return v;
}
elem vector_peek(vector *self)
{
  return self->array[self->size - 1];
}

elem vector_get(vector *self, uint32_t index)
{
  assert(index < self->size);
  return self->array[index];
}

