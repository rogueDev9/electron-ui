import React, { Component } from 'react'
import { subscribe } from 'mqtt-react';
import { Box, Stack, Meter, Text, Button } from 'grommet';

class WeighingScale extends Component {
    state = {
        currentWeight: 0,
        targetWeight: 0,
        scaleStatus: "OFF"
    }

    componentDidMount(){
        const {data, mqttProps, mqtt} = this.props;
        console.log(mqttProps);
        console.log(mqtt);
        console.log(data);
        mqtt.on('connect', () => {
            console.log("mqtt connected")
        })
        mqtt.on('message', (data) => {
            console.log(this.props.data);
            let payload = this.props.data.pop();        
            console.log(payload);    
            this.setState({scaleStatus: true, currentWeight: parseInt(payload.weight), targetWeight: parseInt(payload.weight)});
        })
    }

    tareScale = () => {
    }
    
    render() {
        return (
            <Box style={{marginTop: 45, display: "flex", alignItems: "center", justifyContent:"center", flexDirection: "column", height: "100%"}}>
                <Box style={{flex: 10, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <Box align="center" pad="small">
                    <Stack anchor="center">
                    <Meter
                        type="circle"
                        background="light-2"
                        values={[
                        {
                            value: this.state.currentWeight,
                            onHover: over => {
                            }
                        },
                        {
                            value: this.state.targetWeight,
                            onHover: over => {
                            }
                        }
                        ]}
                        max={50}
                        size="small"
                        thickness="small"
                    />
                    <Box align="center">
                        <Box direction="row" align="center" pad={{ bottom: "xsmall" }}>
                        <Text size="xxlarge" weight="bold">
                            {this.state.currentWeight}
                        </Text>
                        </Box>
                        <Text>{this.state.targetWeight}</Text>
                    </Box>
                    </Stack>                    
                </Box>
                </Box>
                <Box size="large" style={{flex: 10, display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center"}}>
                    {/* <Button onClick={(e) => this.tareScale(e)} round="xxsmall" label="OFF"/> */}
                    <Button onClick={(e) => this.tareScale(e)} round="xxsmall" label="Tare"/>
                </Box>                
            </Box>
        )
    }
}

export default subscribe({
    topic: 'Riku/WeighingScale/Updates'
  })(WeighingScale)