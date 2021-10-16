import React, {useState, useEffect} from 'react'
import "../styles/components/BoardDisplay.scss"
import {API_BASE_URL} from "../utils/urls.utils"
const createEmptyBoard = (num) => {
    return [...new Array(num)].map(_ => ({
        open: true,
        person: null,
    }));
}

const BoardDisplay = ({people}) => {
    const [board, setBoard] = useState(createEmptyBoard(24))

    useEffect(() => {
        // insert people into board

        let newBoard = []
        for(let i = 0; i < board.length; i++){
            const boardCard = board[i]
            if(people && people[board.length-i-1]){
                newBoard.push({
                    ...boardCard,
                    person: people[board.length-i-1] 
                })
            }else{
                newBoard.push(boardCard)
            }
            
        }

        setBoard(newBoard)
    }, [people])


    const onCardClick = (cardIndex) => {
        const newBoard = [...board]
        newBoard[cardIndex].open = !newBoard[cardIndex].open;
        setBoard(newBoard)
    }

    return (
        <div className="board-display">
            {board.map((boardCard, i) => {


                return (
                    <div className="board-display__card-socket">
                        <div className={`board-display__card ${boardCard.open && 'board-display__card--open'}`} onClick={() => onCardClick(i)}>
                            <div className="board-display__card-back"></div>
                            <div className="board-display__card-front">
                                

                               
                                <div className="board-display__card-container">
                                    <div 
                                        className="board-display__card-img-container" 
                                        style={boardCard.person ? 
                                            {backgroundImage: `url('${API_BASE_URL + boardCard.person.image_url}')`} : 
                                            {backgroundImage: `url('/img/card-unplaced.png')`}}>          
                                        </div>
                                    <div className="board-display__card-title">{boardCard.person ? boardCard.person.name : "Unplaced"}</div>
                                </div>
                                 
                            </div>
                            
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default BoardDisplay