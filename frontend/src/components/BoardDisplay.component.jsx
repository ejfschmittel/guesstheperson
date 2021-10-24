import React, {useState, useEffect, useRef} from 'react'
import {API_BASE_URL} from "../utils/urls.utils"

import "../styles/components/BoardDisplay.scss"

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

    const openAll = () => {

        const newBoard = board.map(boardCard => {boardCard.open = true; return boardCard})
        setBoard(newBoard)

    }

    return (
        <div className="board-display__container">
            <div className="board-display">
                {board.map((boardCard, i) => {


                    return (
                    <BoardDisplayCard card={boardCard} key={`board-display-card-${i}`} pos={i} onCardClick={onCardClick}/>
                    )
                })}
            </div>

            <button className="board-display-open-all-btn" onClick={openAll}>Open All</button>
        </div>
    )
}


const BoardDisplayCard = ({card, pos, onCardClick}) => {

    const cardRef = useRef()
    const [height, setHeight] = useState(0);


    useEffect(() => {
        const width = cardRef.current.offsetWidth
        setHeight(width * 4 / 3);
    }, [])



    return (
        <div className="board-display__card-socket" ref={cardRef} style={{height: height}}>
        <div className={`board-display__card ${card.open && 'board-display__card--open'}`} onClick={() => onCardClick(pos)}>
            <div className="board-display__card-back"></div>
            <div className="board-display__card-front">
                

               
                <div className="board-display__card-container">
                    <div 
                        className="board-display__card-img-container" 
                        style={card.person ? 
                            {backgroundImage: `url('${API_BASE_URL + card.person.image_url}')`} : 
                            {backgroundImage: `url('${API_BASE_URL + 'uploads/card-unplaced.png'}')`}}>          
                        </div>
                    <div title={card.person ? card.person.name : "Unplaced"} className="board-display__card-title">{card.person ? card.person.name : "Unplaced"}</div>
                </div>
                 
            </div>
            
        </div>
    </div>
    )
}

export default BoardDisplay