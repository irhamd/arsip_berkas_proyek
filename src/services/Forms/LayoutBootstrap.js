import { Container, Row, Col } from 'react-bootstrap';


export const Grid_ = (props) => {
    return (
        <Col style={{ ...props.style, paddingLeft: "5px", paddingRight: "5px" }} sm={props.sm}>
            {props.children}
        </Col>
    )
}

export const _grid = (r) => {
    return (
        <Col style={{ ...r.style, marginRight: r.ml ? "-20px" : "0" }} sm={r.sm}>
            {r.children}
        </Col>
    )
}

export const _Row = (r) => {
    return (
        <Row onClick={r.onClick} style={{ margin: "0px", ...r.style }} className={r.className}>
            {r.children}
        </Row>
    )
}
export const _Col = (r) => {
    return (
        <Col sm={r.sm} style={{ ...r.style, margin: r.margin ? r.margin : "0px" }} onClick={r.onClick} className={r.className}>
            {r.children}
        </Col>
    )
}

export const _row = (props) => {
    return (
        <Row>
            {props.children}
        </Row>
    )
}

export const Boot = {
    Container(props) {
        return (
            <Container style={{ maxWidth: "100%" }}>
                {props.children}
            </Container>
        )
    },
    Row(props) {
        return (
            <Row>
                {props.children}
            </Row>
        )
    },
    Col(props) {
        return (
            <Col style={{ paddingLeft: "0px", paddingRight: "5px" }} sm={props.sm}>
                {props.children}
            </Col>
        )
    }
}


