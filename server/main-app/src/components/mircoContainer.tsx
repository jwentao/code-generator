import React, { useEffect, useRef } from 'react';
import { loadMicroApp } from 'qiankun';

interface Props {
    name: string
}

const MircoContainer = (props: Props) => {
    let ref = useRef(null);

    useEffect(() => {
        if (props.name) {
            loadMicroApp({
                name: props.name,
                entry: '//localhost:8080',
                container: ref.current as unknown as HTMLElement,
            });
        }
    }, [props])

    return (
        <div ref={ref}>
        </div>
    );
}

export default MircoContainer;
