#![crate_type = "staticlib"]

#[no_mangle]
pub extern  "C" fn get_number(i: i32) -> isize {
  (-18 + i) as isize
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
