import { RecoilRoot } from 'recoil';
import { IManga } from '../../types';
import App from './App';

interface AppProps {
    manga: IManga;
}

function Main({ manga }: AppProps) {
    return (
        <RecoilRoot>
            <App manga={manga} />
        </RecoilRoot>
    );
}

export default Main;
