import React, { useEffect, useRef } from 'react';
import { loadMicroApp } from 'qiankun';

interface Props {
    name: string,
    entry: string
}

const MircoContainer = (props: Props) => {
    let ref = useRef(null);

    useEffect(() => {
        if (props.name) {
            loadMicroApp({
                name: props.name,
                entry: props.entry,
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
