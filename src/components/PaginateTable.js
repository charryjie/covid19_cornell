import React from "react";

import Media from 'react-media';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
    Table,
    Button,
} from "reactstrap";

export class PaginateTable extends React.Component{
    constructor(props) {
      super(props)
      this.state = {
        startIndex: 0,
        selectedIndex: -1
      }
    }
  
    paginateBackward = () => {
      if(this.state.startIndex - 20 >= 0) {
        this.setState({
          startIndex: this.state.startIndex - 20
        })
      }
    }
  
    paginateForward = () => {
      if(this.state.startIndex + 20 < this.props.data.length) {
        this.setState({
          startIndex : this.state.startIndex + 20
        })
      }
    }
  
    render() {
      let thead = ["日期", "总检测", "新增检测", "检测未出结果", "总确诊", "治愈", "住院", "死亡", "今日新增", "现存确诊"];
      let tbody = this.props.data.map((prop, key) => {
        return (
          <tr key={key}>
            <td className="text-left">
              {prop.date.toString().substring(0, 10)}
            </td>
            <td className="text-left">
              {prop.total_test}
            </td>
            <td className="text-left">
              {
                (prop.new_test === undefined)
                  ? "无数据"
                  : prop.new_test
              }
            </td>
            <td className="text-left">
              {prop.pending_result}
            </td>
            <td className="text-left">
              {prop.positive}
            </td>
            <td className="text-left">
              {prop.recovered}
            </td>
            <td className="text-left">
              {prop.hospitalization}
            </td>
            <td className="text-left">
              {prop.death}
            </td>
            <td className="text-left">
              {prop.new_positive}
            </td>
            <td className="text-left">
              {prop.total_active}
            </td>
          </tr>
        );
      })
  
        let thead_sm = ["日期", "总确诊", "今日新增", "新增检测"];
        let tbody_sm = []
        for (let key in this.props.data) {
            if (this.state.selectedIndex === key) {
                tbody_sm.push(
                    <tr>
                        <td colspan="4">
                            <Row>
                                <Col>总检测: {this.props.data[this.state.selectedIndex].total_test}</Col>
                                <Col>检测未出结果: {this.props.data[this.state.selectedIndex].pending_result}</Col>
                                <Col>治愈: {this.props.data[this.state.selectedIndex].recovered}</Col>
                                <Col>住院: {this.props.data[this.state.selectedIndex].hospitalization}</Col>
                                <Col>死亡: {this.props.data[this.state.selectedIndex].death}</Col>
                                <Col>现存确诊: {this.props.data[this.state.selectedIndex].total_active}</Col>
                            </Row>
                        </td>
                    </tr>
                )
            }
            tbody_sm.push(
                <tr key={key} onClick={() => this.setState({selectedIndex: key})}>
                    <td className="text-left">
                    {this.props.data[key].date.toString().substring(0, 10)}
                    </td>
                    <td className="text-left">
                    {this.props.data[key].positive}
                    </td>
                    <td className="text-left">
                    {this.props.data[key].new_positive}
                    </td>
                    <td className="text-left">
                    {
                        (this.props.data[key].new_test === undefined)
                        ? "无数据"
                        : this.props.data[key].new_test
                    }
                    </td>
                </tr>
            )
        }
        
        return (
            <Card>

                <CardHeader>
                    <CardTitle tag="h4">{this.props.title}</CardTitle>
                </CardHeader>

                <CardBody>
                    <Media query={{ maxWidth: 799 }}>
                        {matches =>
                            matches ? (
                            <Table responsive>
                                <thead className="text-primary">
                                <tr>
                                    {thead_sm.map((prop, key) => {
                                    return <th key={key}>{prop}</th>;
                                    })}
                                </tr>
                                </thead>
                                <tbody>
                                {tbody_sm.reverse().slice(this.state.startIndex, this.state.startIndex+20)}
                                </tbody>
                            </Table>
                            ) : (
                            <Table responsive>
                                <thead className="text-primary">
                                <tr>
                                    {thead.map((prop, key) => {
                                    return <th key={key}>{prop}</th>;
                                    })}
                                </tr>
                                </thead>
                                <tbody>
                                {tbody.reverse().slice(this.state.startIndex, this.state.startIndex+20)}
                                </tbody>
                            </Table>
                            )
                        }
                    </Media>
                </CardBody>

                <CardFooter className="text-center">
            
                    <Button onClick={this.paginateBackward} style={{marginRight: "30px"}}>
                        上一页
                    </Button>
                        
                    <Button onClick={this.paginateForward}>
                        下一页
                    </Button>
                        
                    
                </CardFooter>

            </Card>
        )
    }
}