import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'
import YouTubePlayer from './YouTubePlayer'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();
    
    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }
    return (
        <div>
        <Box id="list-selector-list">
        <List 
            id="playlist-cards" 
            sx={{overflow: 'scroll', height: '87%', width: '100%', bgcolor: '#8000F00F'}}
        >
            {
                store.currentList.songs.map((song, index) => (
                    <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                        published={store.currentList.published}
                    />
                ))  
            }
         </List>            
         { modalJSX }
         </Box>
         <Box id= "youtubeplayer">
            <YouTubePlayer></YouTubePlayer>
         </Box>
         </div>
    )
}

export default WorkspaceScreen;