import Pagination from 'react-bootstrap/Pagination';

import React from 'react'


const Paginacion = ({
  page,
  totalPages,
  setPaginacion
}) => {


  return (
    <Pagination>
      <Pagination.First onClick={() => setPaginacion(prev => ({ ...prev, page: 1 }))} />
      <Pagination.Prev onClick={() => setPaginacion(prev => ({ ...prev, page: prev.hasPrevPage ? prev.page - 1 : prev.totalPages }))} />

      {
        new Array(totalPages).fill(2, 0).map((p, i) => {

          return < div key={i}>

            {

              page === (i + 1) ?
                <Pagination.Item
                 active>{i + 1}</Pagination.Item>

                :
                <Pagination.Item
                  onClick={() => setPaginacion(prev => ({ ...prev, page: i + 1 }))}
                >{i + 1}</Pagination.Item>

            }


          </div>




        })
      }


      <Pagination.Ellipsis />

      {/* <Pagination.Item>{10}</Pagination.Item>
    <Pagination.Item>{11}</Pagination.Item>
    <Pagination.Item active>{12}</Pagination.Item>
    <Pagination.Item>{13}</Pagination.Item>
    <Pagination.Item disabled>{14}</Pagination.Item>

    <Pagination.Ellipsis />
    <Pagination.Item>{20}</Pagination.Item> */}
      <Pagination.Next onClick={() => setPaginacion(prev => ({ ...prev, page: prev.hasNextPage ? prev.page + 1 : 1 }))} />
      <Pagination.Last onClick={() => setPaginacion(prev => ({ ...prev, page: prev.totalPages }))} />
    </Pagination>
  )
}

export default Paginacion

