import React from 'react';
import "./pagination.scss"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const Pagination = ({productsPerPage, totalProducts, setCurrentPage, currentPage}) => {

    const pageNumbers = []; 

    for(let i = 1; i <= Math.ceil(totalProducts/productsPerPage); i++) {
        pageNumbers.push(i)
    }

    const handlePrev = () => {
        if(currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNext = () => {
        if(currentPage < pageNumbers.length) {
            setCurrentPage(currentPage +1)
        }
    }

    

  return (
    <div className='pagination'>
        {pageNumbers.length > 1 && <>
            <ul className='paginationList'>
                { currentPage > 2 && <li className="paginationItem">
                    <span className="pageLink"onClick={() => setCurrentPage(1)}><KeyboardDoubleArrowLeftIcon  className='icon'/></span>
                </li>}
                { currentPage > 1 && <li className="paginationItem">
                    <span className="pageLink"onClick={handlePrev}><ArrowBackIosNewIcon  className='icon'/></span>
                </li>}
                
                {
                    pageNumbers.map(number => (
                        (number === currentPage || number === currentPage + 1 || number === currentPage - 1)  &&
                        <li className={number === currentPage ? "paginationItem active" : "paginationItem"} key={number} >
                            <span className='pageLink' onClick={() => setCurrentPage(number)}>{number}</span>
                        </li>
                    ))
                }

                {currentPage < pageNumbers.length && <li className="paginationItem">
                    <span className="pageLink" onClick={handleNext}><ArrowForwardIosIcon  className='icon'/></span>
                </li>}
                {pageNumbers.length - currentPage > 1 && <li className="paginationItem">
                    <span className="pageLink" onClick={() => setCurrentPage(pageNumbers[pageNumbers.length - 1])}><KeyboardDoubleArrowRightIcon  className='icon'/></span>
                </li>}
            </ul>
            <span className='label'>page {currentPage} of {pageNumbers.length}</span>
        </>}
    </div>
  )
}

export default Pagination