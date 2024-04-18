import React from 'react'
import { Outlet } from 'react-router';

// 공통적으로 나오게 하고싶은 작업
export default function Layout() {
    // <Outlet /> :
    // - 부모 <Route>에 해당 컴포넌트가 element로 등록되었을 때 자식 <Route>의 element가 해당 위치에 표시되도록 하는 컴포넌트

    return (
        <>
            <h2 style={{ color: 'red' }}>Router</h2>
            <Outlet />
        </>
    );
}
