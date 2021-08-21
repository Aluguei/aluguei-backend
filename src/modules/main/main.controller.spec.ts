import { Test, TestingModule } from '@nestjs/testing'
import { MainController } from './main.controler'
import { MainService } from './main.service'

describe('MainController', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [MainController],
      providers: [MainService]
    }).compile()
  })

  describe('root', () => {
    it('should return ok:true', () => {
      const appController = app.get<MainController>(MainController)
      expect(appController.getStatus()).toEqual({ ok: true })
    })
  })
})
