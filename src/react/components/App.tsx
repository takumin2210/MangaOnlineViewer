import React from 'react';
import { RecoilRoot } from 'recoil';
import { IManga } from '../../types';
import Reader from './Reader';

interface AppProps {
    manga: IManga;
}

const App: React.FC<AppProps> = ({ manga }) => (
    <RecoilRoot>
        <Reader manga={manga} />
    </RecoilRoot>
);
export default App;
