import Base

def adder(k: U32) -> U32 -> U32:
  x => (x + k : U32)

def compute(k: U32, x: U32) -> U32:
  add = adder(k)
  add(x)
