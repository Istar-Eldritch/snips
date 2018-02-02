#![feature(rustc_private)]
extern crate rand;

fn main() {
    println!("{:?}", worst_g100(15));
}

fn g100(hit:i32, acc: i32, step: i32, gap: i32) -> i32 {
  if step == hit {
    acc
  }
  else if step <= (hit - gap) {
    let ngap = if gap > 1 {gap - 1} else {gap};
    g100(hit, acc + 1, step + ngap, ngap)
  } else {
    g100(hit, acc + 1, step + 1, 1)
  }
}

#[derive(Debug)]
struct Stats {
  worst: i32,
  average: f64
}

fn worst_g100(gap: i32) -> Stats {
  const ITERATIONS: i32 = 1000;
  let mut worst = 0;
  let mut accumulator: f64 = 0.0;
  for _ in 0..ITERATIONS {
    let floor = get_floor();
    let current = g100(floor, 0, 0, gap);
    if current > worst {
      worst = current;
    }
    accumulator = accumulator + (current as f64);
  }
  return Stats{worst, average: accumulator / (ITERATIONS as f64)};
}

fn get_floor() -> i32 {
  return (rand::random::<f64>() * 100 as f64).round() as i32;
}

#[cfg(test)]
mod tests {
}
