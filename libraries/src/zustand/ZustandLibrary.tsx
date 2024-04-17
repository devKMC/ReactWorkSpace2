import React, { useState } from 'react'
import { create } from 'zustand';

// zustand 패키지 (라이브러리) :
// - react에서 사용할 수 있는 상태 관리 라이브러리 중 하나
// - 상태 관리 라이브러리 중 Redux 라이브러리가 현재 가장 많이 사용됨
// - Redux의 고질적인 문제점으로 복잡한 코드 구조와 높은 학습 곡선을 요구
// - Zustand는 단순한 코드 구조와 학습 곡선이 매우 낮음 - useState 사용 수준의 학습 곡선을 요구
// - Redux, MobX 와 같은 타 상태 관리 라이브러리들에 비해 번들의 크기가 작음 - 빌드 할 때 패키징 속도 향상 / 빌드 후에 번들의 크기가 작음


// zustand를 이용한 글로벌 상태 선언 방법
// 1. zustand의 create 함수를 사용하여 store를 생성
// store : 상태와 상태 관리 로직을 하나로 묶은 객체
// store 생성하는 create 함수의 반환 데이터는 훅 함수를 반환 (use 라는 이름의 함수명으로 받아야함)

// - create 함수의 매개변수로 set 인자를 받는 콜백 함수로 전달해야함
// - 매개변수로 전달한 콜백 함수는 store 객체를 반환해야 함
// - store 객체는 상태, store 객체를 변경하는 함수를 포함


// - typescript에서 zustand의 creat 함수를 사용할때는 create 함수의 제너릭으로 상태의 타입을 지정해야함
// - 타입 지정 (인터페이스를 사용해서 지정 해야 함)
// setZNormal = 함수
// zNormal변수= 기능
// *store를 사용하면 바로 전달 할 수 있음 (불필요한 동작 최소화)
interface Store {
    zNormal: number;
    setZNormal: (zNormal: number) => void; // 반환이 없이 호출만 하고 있음
    increaseZnormal: () => void;
    drcreaseZnormal: () => void;
}


// * z 의 이름으로 노말 형태로 초기값 0
// create 함수의 콜백 함수가 받는 set 인자는 상태 변경을 위한 함수
const useStore = create<Store>((set) =>
({
    zNormal: 0,
    // set 함수는 매개변수로 현재 상태를 인자로 받는 콜백 함수를 전달해야함
    // set 함수의 매개변수로 전달된 콜백 함수는 상태객체 (stor)를 반환해야 함
    setZNormal: (zNormal) => set(state => ({ ...state, zNormal })),
    // 상태를 매개변수를 받는 콜백함수를 가져와서 객체를 반환하기 위해 원래 state 상태를 유지시키고 zNormal을 바꾸기 위해 현재 상태(state).zNormal +1 을 한다.
    increaseZnormal: () => set(state => ({ ...state, zNormal: state.zNormal + 1 })),
    drcreaseZnormal: () => set(state => ({ ...state, zNormal: state.zNormal - 1 }))

})
);

export default function ZustandLibrary() {

    // useState를 이용한 상태 선언 방법
    const [normal, setNormal] = useState<number>(0);

    const changeNormal = (normal: number) => {
        setNormal(normal);
    }

    const increaseNormal = () => {
        setNormal(normal + 1);
    }

    const decreaseNormal = () => {
        setNormal(normal - 1);
    }

    // zustand로 선언한 상태 사용
    // const { 상태들, 상태변경함수들 } = useStoreZustand훅함수();
    const { zNormal, setZNormal, increaseZnormal, drcreaseZnormal } = useStore();

    return (
        <div>
            <a href="http//localhost:3000"> 홈으로 </a>
            <div>
                <h4>useState 방식 : {normal}</h4>
                <button onClick={decreaseNormal}>-</button>
                <button onClick={increaseNormal}>+</button>
            </div>
            <div>
                <h4>zustand 방식 : {zNormal}</h4>
                <button onClick={drcreaseZnormal}>-</button>
                <button onClick={increaseZnormal}>+</button>
            </div>
            <SubComponent1 normal={normal} increseNormal={increaseNormal} dcreaseNormal={decreaseNormal}></SubComponent1>
            <SubComponent2></SubComponent2>
        </div>
    );
}

interface Sub1Props {
    normal: number;
    increseNormal: () => void;
    dcreaseNormal: () => void;
}

function SubComponent1({ normal, increseNormal, dcreaseNormal }: Sub1Props) {

    return (
        <div>
            <h5>Normal :{normal} </h5>
            <button onClick={dcreaseNormal}>-</button>
            <button onClick={increseNormal}>+</button>
        </div>
    )
}

function SubComponent2() {

    const { zNormal, increaseZnormal, drcreaseZnormal } = useStore();

    return (
        <div>
            <h5>Zustand : {zNormal} </h5>
            <button onClick={increaseZnormal}>-</button>
            <button onClick={drcreaseZnormal}>+</button>
        </div>
    )
}