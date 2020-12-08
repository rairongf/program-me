import React from "react"
import "./Descricao.css"

function Descricao() {
        return (
            <>
                <div className="descricao">
                    <h4>
                        O objetivo dos workshops do <span className='title'>program.me</span> é possibilitar que alunos
                    e colaboradores do Inatel possam ter a oportunidade de terem um primeiro 
                    contato com linguagens de programação que geralmente não são abordadas nos 
                    cursos de graduação mas que podem ser relevantes no mercado de trabalho. 
                    É uma oportunidade de também reunir em um só espaço iniciantes ou entusiastas 
                    que desejam trocar experiências sobre um determinado paradigma ou linguagem de programação.
                    </h4>
                    <p>by:
                        <a href='https://www.instagram.com/rairongf/'
                           target='_blank'
                           rel='noopener noreferrer'
                        >
                            <span className='author'> @rairongf</span>
                        </a>
                    </p>
                </div>
            </>
        )
}

export default Descricao