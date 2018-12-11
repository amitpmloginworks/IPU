

const HTTP_TIMEOUT: number = 60000;
export interface Enviroment{
mainApi:string,
timeout:number
}

export const Test:Enviroment={
	mainApi:'https://ipublishu.com/api',
	 timeout: HTTP_TIMEOUT
}

export const ENV:Enviroment=Test;
