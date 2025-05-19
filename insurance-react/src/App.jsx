import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FileClaimPage from './components/Customer/FileClaimPage';
// ...existing imports...

function App() {
    return (
        <Router>
            <Routes>
                {/* ...existing routes... */}
                <Route path="/customer/file-claim" element={<FileClaimPage />} />
            </Routes>
        </Router>
    );
}

export default App;
