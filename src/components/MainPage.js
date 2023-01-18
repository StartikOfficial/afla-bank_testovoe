import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { selectItems, getNewItems, selectLoadingState } from "../slices/storiesDataSlice";
import { unixToDate } from "../utils/unixToDate";



export default function MainPage() {
    const loadingItemsState = useSelector(selectLoadingState);
    const items = useSelector(selectItems);
    
    const dispatch = useDispatch();

    // время таймера
    // const seconds = 600;
    // const [timeLeft, setTimeLeft] = useState(seconds);

    const toggleLike = (e) => {
        let likes = +e.target.lastChild.data;
        const list = e.target.classList;
        list.toggle("liked");
        list.contains("liked") ? e.target.lastChild.data = (likes += 1) : e.target.lastChild.data = (likes -= 1);
    }

    const deleteCard = e => {
        console.log(e);
        e.target.parentElement.classList.add("hidden");
        e.target.parentElement.classList.add("deleted");
    }

    const filterLiked = () => {
        const cardsList = document.getElementById("cards-list").children;
        for (let i=0; i < cardsList.length; i++) {
            if (!cardsList[i].children[0].children[1].classList.contains("liked") && !cardsList[i].classList.contains("deleted")) cardsList[i].classList.toggle("hidden");
        }
    }
    
    // Стейты для кнопки
    // const [disableButton, setDisableButton] = useState(false);
    // const [showText, setShowText] = useState(false);
    // useEffect(() => {
    //     if (!timeLeft) {dispatch(getNewItems()); setTimeLeft(seconds)};

    //     if (!loadingItemsState) {
    //         const intervalId = setInterval(() => {
    //             setTimeLeft(timeLeft - 1);
    //         }, 1000);
    //         return () => clearInterval(intervalId);
    //     }
    //     else {setTimeLeft(seconds)}
        

    //   }, [timeLeft, loadingItemsState]);

      // устранение бага, когда на первом месте массива появляется null, undefined
      (!items[0]) && dispatch(getNewItems());

    return (
        <>
        
        {/* <button onMouseEnter={() => setShowText(true)} onMouseLeave={() => setShowText(false)} disabled={disableButton} className="select-none opacity-50 hover:opacity-100 z-10 drop-shadow-lg fixed bottom-0 right-0 h-28 w-28 mx-8 my-16 leading-4 text-[#fb6357] md:mx-8 md:my-24 md:h-56 md:w-56 md:text-4xl bg-[#4e3038] rounded-3xl font-bold"
        onClick={async () => {setDisableButton(true); dispatch(getNewItems()); setDisableButton(false)}}>{loadingItemsState ? <span>
            загрузка...</span> : <span className="text-[#fb6357] p-0">{showText ? "обновить?" : `Новости обновятся через: ${timeLeft}`}</span>}</button> */}
        <label for="filter">Отфильтровать по лайкам</label><input name="filter" id="filter" type={"checkbox"} onChange={() => filterLiked()}/>
        <ul className="flex flex-col items-center md:max-w-5/6 w-4/5 m-auto" id="cards-list">
            {loadingItemsState ? 
            <svg className="animate-spin fixed left-50" fill="white" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="100px" height="100px" viewBox="0 0 26.349 26.35" 
            space="preserve">
            <g><g><circle cx="13.792" cy="3.082" r="3.082"/><circle cx="13.792" cy="24.501" r="1.849"/><circle cx="6.219" cy="6.218" r="2.774"/><circle cx="21.365" cy="21.363" r="1.541"/><circle cx="3.082" cy="13.792" r="2.465"/><circle cx="24.501" cy="13.791" r="1.232"/><path d="M4.694,19.84c-0.843,0.843-0.843,2.207,0,3.05c0.842,0.843,2.208,0.843,3.05,0c0.843-0.843,0.843-2.207,0-3.05C6.902,18.996,5.537,18.988,4.694,19.84z"/><circle cx="21.364" cy="6.218" r="0.924"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
             :  
            items?.map((el, i) =>
            <div className="min-w-full">
            <li className="h-max max-680:text-sm px-8 py-4 flex flex-row mb-7 items-center justify-between min-w-full drop-shadow-2xl bg-[#2d2d3a]" key={el?.id}>
                <div className="Description flex flex-col mr-10 w-full">
                        <a href={el?.url} className="font-bold">{el?.title}</a>
                    <div className="Props flex flex-row">
                        <span className="text-gray-400 mr-6">by {el?.by}</span>
                        <span className="flex flex-row">
                            {unixToDate(el?.time)}</span>
                    </div>
                </div>
                <div onClick={e => toggleLike(e)} className="Score h-16 min-h-16 w-20 max-w-20 min-w-20 justify-around text rounded-2xl flex flex-col items-center drop-shadow-xl">
                    <svg className="w-6 h-6 bg-inherit pointer-events-none" fill="white" width="512px" height="512px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title>ionicons-v5-q</title><path className="pointer-events-none" d="M464,464H48a16,16,0,0,1-14.07-23.62l208-384a16,16,0,0,1,28.14,0l208,384A16,16,0,0,1,464,464Z"/></svg>
                    {el?.score}
                </div>
                <svg onClick={e => deleteCard(e)} className=" ml-6 h-16 min-h-16 w-20 max-w-20 min-w-20 bg-inherit" xmlns="http://www.w3.org/2000/svg" fill="#000000" width="800px" height="800px" viewBox="0 0 24 24"><path className="pointer-events-none" d="M22,5H17V2a1,1,0,0,0-1-1H8A1,1,0,0,0,7,2V5H2A1,1,0,0,0,2,7H3.061L4,22.063A1,1,0,0,0,5,23H19a1,1,0,0,0,1-.937L20.939,7H22a1,1,0,0,0,0-2ZM9,3h6V5H9Zm9.061,18H5.939L5.064,7H18.936ZM9,11v6a1,1,0,0,1-2,0V11a1,1,0,0,1,2,0Zm4,0v6a1,1,0,0,1-2,0V11a1,1,0,0,1,2,0Zm3-1a1,1,0,0,1,1,1v6a1,1,0,0,1-2,0V11A1,1,0,0,1,16,10Z"/></svg>
            </li>
            </div>
            )}
        </ul>
        </>
    )
}