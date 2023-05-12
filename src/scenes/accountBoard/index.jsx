import { ColorModeContext, useMode } from '../../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Topbar from '../global/Topbar';
import SideBar from '../global/Sidebar';
import Projects from '../projects';
import ClientForm from '../clientForm';
import Consumers from '../clients';
import Calendar from '../calendar';
import Applications from '../applications';
import ProjectForm from '../projectForm';
import ReportForm from '../reportForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewsPanel from '../newsPanel';
import NewsForm from '../newsForm';

const AccountBoard = () => {
    const [theme, colorMode] = useMode();
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <SideBar/>
            <main className='content'>
              <Topbar />
              <Routes>
                <Route path="/profile-form/*" element={<ClientForm/>}/>
                <Route path="/clients/*" element={<Consumers/>}/>
                <Route path="/calendar/*" element={<Calendar/>}/>
                <Route path="/projects/*" element={<Projects/>}/>
                <Route path="/applications/*" element={<Applications/>}/>
                <Route path="/project-form/*" element={<ProjectForm/>}/>
                <Route path="/report-form/*" element={<ReportForm/>}/>
                <Route path="/news-form/*" element={<NewsForm/>}/>
                <Route path="/news/*" element={<NewsPanel/>}/>
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    )
  }
  
  export default AccountBoard;