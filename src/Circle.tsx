import styled from "styled-components"

interface CircleProps {
    bgColor: string;
    borderColor?: string;
    text?: string;
}

interface ContainerProps {
    bgColor: string;
    borderColor: string;
}

const Container = styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    background-color: ${(props) => props.bgColor};
    border-radius: 50%;
    border: 1px solid ${(props) => props.borderColor};
`;

function Circle({ bgColor, borderColor, text = "Default Text" }: CircleProps) {
    return <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
        {text}
    </Container>;
};

export default Circle;