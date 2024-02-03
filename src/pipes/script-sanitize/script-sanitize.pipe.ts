import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ScriptSanitizePipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    this.cleanScriptTag(value)
    for(const item in value){
        console.log(value[item]);
        if(Array.isArray(value[item])){
            Array(value[item]).forEach(x => {
                for(const y in x){
                    console.log(x[y]);

                }
            })
        }
    }

    return value
  }

  cleanScriptTag(value: unknown){
    Object.keys(value).forEach((key) => {
        switch(typeof value[key]){
            case 'string':
                value[key] = value[key].replace(/<script>|<\/script>|<svg>|<\/svg>|<img>|<\/img>/g,'');
                break;
            case 'object':
                if(Array.isArray(value[key])){
                     Array(value[key]).forEach(item => this.cleanScriptTag(item))
                }else{
                    this.cleanScriptTag(value[key]);
                }
                break;
            default:
                break;
        }
    })
}
}
