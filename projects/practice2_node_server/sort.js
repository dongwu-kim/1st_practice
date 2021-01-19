var numbers = [9, 8, 7, 6, 5, 4, 3, 2, 1];
alert(numbers.sort()); // array, [1,2,3,4,5,6,7,8,9]
alert(numbers); // array, [1,2,3,4,5,6,7,8,9], 원본을 변경한다.
alert(numbers.sort() === numbers); // boolean, true, 원본과 반환값이 같다.

var numbers = [20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
//array, [1,10,2,20,3,4,5,6,7,8,9], 암시적으로 원소를 문자로 형변환 하기 때문에 10이 1뒤에 온다.
alert(numbers.sort());

function sortNumber(a, b) {
  // 비교 대상인 a와 b가 인자로 전달된다.
  //alert('a :'+a+', b:'+b);
  // a에서 b를 뺀 결과가 음수면 a가 b보다 작고, 0이면 같다.
  // sort메소드는 return 값이 음수,양수,0인지에 따라서 순서를 정한다.
  return a - b;
}
var numbers = [20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
alert(numbers.sort(sortNumber)); // array, [1,2,3,4,5,6,7,8,9,10,20]

function sortNumber(a, b) {
  // 위의 예제와 비교해서 a와 b의 순서를 바꾸면 정렬순서가 반대가 된다.
  return b - a;
}
var numbers = [20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
alert(numbers.sort(sortNumber)); // array, [20,10,9,8,7,6,5,4,3,2,1]
